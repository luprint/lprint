export default `function lpPrettyPrint(variable, indent)
	local indentLevel = indent or 0
	if type(variable) == 'table' then
		local store = "{\\n"
		for key, in pairs(variable) do
			if type(key) ~= 'number' then
				key = '"'..key..'"'
			end
			store = store .. string.rep("    ", indentLevel + 1) .. key ..' = ' .. lpPrettyPrint(value, indentLevel + 1) .. ',\\n'
		end

		return store .. string.rep("    ", indentLevel) .. '} '
	else
		return tostring(variable) .." (" .. typeof(variable) .. ")"
	end
end
`;

// if, for, end
