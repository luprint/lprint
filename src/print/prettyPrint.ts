export default `function lpPrettyPrint(variable: any, indent: number?): string
	local indentLevel = indent or 0
	if type(variable) == 'table' then
		local store = "{\\n"
		for key, value in pairs(variable) do
			if type(key) ~= 'number' then
				key = '"'.. tostring(key) ..'"'
			end
			store = store .. string.rep("    ", indentLevel + 1) .. tostring(key) ..' = ' .. lpPrettyPrint(value, indentLevel + 1) .. ',\\n'
		end

		return store .. string.rep("    ", indentLevel) .. '} '
	else
		return tostring(variable) .." (" .. typeof(variable) .. ")"
	end
end
`;

// if, for, end
