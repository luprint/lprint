export default (line: string): string => {
    const words = line.split("print");
    words[0] = words[0].replace(/-/g, '');
    return words.join("print");
};
