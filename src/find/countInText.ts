export interface CountInTextProps {
    text: string;
    search: string;
}

export default (props: CountInTextProps) => (props.text.match(new RegExp(props.search, "g")) || []).length;
