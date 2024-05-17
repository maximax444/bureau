import JoditEditor from "jodit-react";

type Props = {
    onChange: (newContent: any) => any;
    editor: any;
    content: any;
};

export function Editor(props: Props) {
    return (
        <JoditEditor ref={props.editor} value={props.content} onChange={props.onChange} />
    )
}
