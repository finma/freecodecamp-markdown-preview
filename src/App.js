/* globals marked, Prism */

import { useState } from "react";

const App = () => {
  const [markdown, setMarkdown] = useState(placeholder);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <div className="wrapper">
      <div className="editor-wrapper">
        <Input value={markdown} onChange={handleChange} />
      </div>

      <div>
        <Preview markdown={markdown} />
      </div>
    </div>
  );
};

const Input = ({ onChange, value }) => {
  return <textarea id="editor" onChange={onChange} value={value}></textarea>;
};

const Preview = ({ markdown }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked(markdown, { renderer: renderer }),
      }}
      id="preview"
    />
  );
};

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  },
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

const placeholder = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

`;

export default App;
