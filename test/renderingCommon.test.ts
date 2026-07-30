jest.mock('../src/main', () => {
    return { ObsidianApp: { vault: { getConfig: jest.fn() } } }
})
jest.mock('../src/settings', () => { return { SettingsData: { colorSchema: null } } })

import { SettingsData } from '../src/settings'
import RC from '../src/rendering/renderingCommon'
import { EColorSchema } from '../src/interfaces/settingsInterfaces'
import * as main from '../src/main'

const kLightCSSClass = 'is-light'
const kDarkCSSClass = 'is-dark'

// @ts-ignore
const getConfigMock: jest.Mock = main.ObsidianApp.vault.getConfig

describe('RenderingCommon', () => {
    describe('getTheme', () => {
        test('Light', () => {
            SettingsData.colorSchema = EColorSchema.LIGHT
            expect(RC.getTheme()).toEqual(kLightCSSClass)
        })
        test('Dark', () => {
            SettingsData.colorSchema = EColorSchema.DARK
            expect(RC.getTheme()).toEqual(kDarkCSSClass)
        })
        test('Not Set', () => {
            SettingsData.colorSchema = null
            expect(RC.getTheme()).toEqual(kLightCSSClass)
        })
        test('Follow Obsidian - Light', () => {
            getConfigMock.mockReturnValueOnce('moonstone')
            SettingsData.colorSchema = EColorSchema.FOLLOW_OBSIDIAN
            expect(RC.getTheme()).toEqual(kLightCSSClass)
        })
        test('Follow Obsidian - Dark', () => {
            getConfigMock.mockReturnValueOnce('obsidian')
            SettingsData.colorSchema = EColorSchema.FOLLOW_OBSIDIAN
            expect(RC.getTheme()).toEqual(kDarkCSSClass)
        })
    })

    describe('renderIssue', () => {
        test('can hide the issue type icon', () => {
            const createElementMock = jest.fn((_tag?: string, _options?: any) => ({}))
            ;(global as any).createDiv = jest.fn(() => ({}))
            ;(global as any).createSpan = jest.fn(() => ({}))
            ;(global as any).createEl = createElementMock

            RC.renderIssue({
                key: 'TILE-1349',
                account: {
                    host: 'https://jira.example.com',
                    color: '#000000',
                },
                fields: {
                    issuetype: {
                        iconUrl: 'https://jira.example.com/icon.png',
                        name: 'Initiative',
                    },
                    summary: 'Tile Debugging',
                    status: {
                        name: 'In Progress',
                        description: '',
                        statusCategory: {
                            colorName: 'yellow',
                        },
                    },
                },
            } as any, false, { showIssueTypeIcon: false })

            expect(createElementMock.mock.calls.some(([tag]) => tag === 'img')).toBe(false)
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
})

export { }
