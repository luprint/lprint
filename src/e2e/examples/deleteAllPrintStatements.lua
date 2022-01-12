function lpPrettyPrint(variable, indent)
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
local test, great = 'hey', 'another'
print('LTP: ' .. test.. 'variable: ' .. great .. ' Line: 0 File: test.lua')
print('LTP: ' .. test variable:  great  .. "() {()()()}" .. ' Line: 0 File: test.lua')
print('LTP: ' .. test, great .. ' Line: 0 File: test.lua')
print('LTP: ' .. test, great ..
  ' Line: 0 File: test.lua' .. type(test)
)
print('hey')
local test = 'another'
--print('LTP: ' .. test .. ' Line: 6 File: test.lua')
print('LTP Line: 7 File: (test.lua)')
local = 'another'
print('here')
print('hey')
