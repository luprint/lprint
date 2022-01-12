export interface GenerateProps {
    count: number;
    file: string;
    variable?: string;
    isPrettyPrintEnabled?: boolean;
}

const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

export default (generateProps: GenerateProps) => {
    const { count, file, variable, isPrettyPrintEnabled } = generateProps;

    if (variable) {
        const variables = variable.split(",").map(name => name.trim());

        const formattedVariables = isPrettyPrintEnabled ? variables.map(name => `${name}: " .. lpPrettyPrint(${name}) .. "`).join(` | `) : variables.map(name => `${name}: " .. tostring(${name}) .. " type: " .. type(${name}) .. "`).join(` | `);

        return `print("LP🎨${emojis[count] || count + 1}: ${formattedVariables} in ${file}")\n`;
    }
    else {
        return `print("LP🎨${emojis[count] || count + 1}: called in ${file}")\n`;
    }
};
