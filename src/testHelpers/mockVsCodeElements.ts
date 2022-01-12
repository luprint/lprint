export const mockEditor = {
    document: {
        lineAt: jest.fn(),
        getText: jest.fn(),
        fileName: "c://person/thing/another/test.lua",
    },
    selection: {
        active: {
            line: 1,
            character: 1,
        },
        anchor: {
            character: 1
        },
    },
    edit: jest.fn(),
};
