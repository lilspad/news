import ReactMarkdown from 'react-markdown';

type MarkdownProps = {
  text: string;
};

export function Markdown({ text }: MarkdownProps) {
  return (
    <ReactMarkdown>
      {text}
    </ReactMarkdown>
  );
}
