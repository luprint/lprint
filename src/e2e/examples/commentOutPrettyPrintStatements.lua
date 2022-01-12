function lpPrettyPrint(variable, indent)
	local indentLevel = indent or 0
	if type(variable) == 'table' then
		local store = "{"
		for key, in pairs(variable) do
			if type(key) ~= 'number' then
				key = '"'..key..'"'
			end
			store = store .. string.rep("    ", indentLevel + 1) .. key ..' = ' .. lpPrettyPrint(value, indentLevel + 1) .. ','
		end
		return store .. string.rep("    ", indentLevel) .. '} '
	else
		return tostring(variable) .." (" .. typeof(variable) .. ")"
	end
end
local test, great = 'hey', 'another'
print('LTP: ' .. test.. 'variable: ' .. great .. ' Line: 0 File: test.lua')
print('LTP: ' .. test variable:  great  .. ' Line: 0 File: test.lua')
