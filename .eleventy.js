const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const { parse } = require("node-html-parser");

const BLOCK_SELECTOR = /^(p|h[1-6])$/i;
const WIDONT_RE = /(\S+)\s+(\S+)\s*$/;

const mdOptions = {
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
};

const pathToInt = (path) => {
  const ints = path.match(/\d+/g);
  const fileValue = parseInt(ints.pop(), 10);
  const folderValue = parseInt(ints.pop(), 10);
  const pathInt = fileValue + folderValue * 1000;

  return pathInt;
};

const processTextNodes = (node) => {
  for (const child of node.childNodes || []) {
    if (child.tagName && BLOCK_SELECTOR.test(child.tagName)) {
      processBlock(child);
    }
    processTextNodes(child);
  }
};

const processBlock = (block) => {
  const lastTextNode = findLastTextNode(block);
  if (lastTextNode) {
    lastTextNode.rawText = lastTextNode.rawText.replace(
      WIDONT_RE,
      "$1&nbsp;$2",
    );
  }
};

const findLastTextNode = (node) => {
  // search backwards through descendants
  const children = [...(node.childNodes || [])].reverse();
  for (const child of children) {
    // text node with visible text
    if (child.nodeType === 3 && child.rawText.trim()) {
      return child;
    }
    const nested = findLastTextNode(child);
    if (nested) return nested;
  }
  return null;
};

module.exports = (eleventyConfig) => {
  eleventyConfig.addCollection("slides", (collection) => {
    return collection
      .getAllSorted()
      .filter((page) => {
        return page.inputPath.match(/^\.\/src\/slides/) !== null;
      })
      .sort((a, b) => {
        return a.inputPath.localeCompare(b.inputPath, undefined, {
          numeric: true,
        });
      });
  });

  eleventyConfig.addFilter("data_attrs", (attrs) => {
    if (!attrs) return;

    if (typeof attrs !== "object") return;

    if (Object.keys(attrs).length < 1) return;

    const keys = [];

    Object.keys(attrs).map((key) => {
      if (key.indexOf("data-") === 0) {
        keys.push(`${key}="${attrs[key]}"`);
      }
    });

    if (keys.length < 1) return;

    return keys.join(" ");
  });

  eleventyConfig.setLibrary("md", markdownIt(mdOptions));

  eleventyConfig.addPlugin(syntaxHighlight, {
    templateFormats: ["md", "html"],
  });

  eleventyConfig.addTransform("widont", async function (content) {
    const root = parse(content);

    const selectors = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];

    for (const selector of selectors) {
      const nodes = root.querySelectorAll(selector);
      for (const node of nodes) {
        processTextNodes(node);
      }
    }

    return root.toString();
  });

  eleventyConfig.addPassthroughCopy({
    "./node_modules/reveal.js/dist/": "reveal",
  });
  eleventyConfig.addPassthroughCopy("src/images");

  eleventyConfig.addWatchTarget("./src/_includes/theme/**/*.scss");

  return {
    templateFormats: ["liquid", "md", "html", "11ty.js"],
    dir: {
      input: "./src",
    },
  };
};
