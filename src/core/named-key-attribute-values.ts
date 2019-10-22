export namespace NamedKeyAttributeValues {
    export enum MODIFIER_KEYS {
        ALT = "Alt",
        ALT_GRAPH = "AltGraph",
        CAPS_LOCK = "CapsLock",
        CONTROL= "Control",
        FN = "Fn",
        FN_LOCK = "FnLock",
        HYPER = "Hyper",
        META = "Meta",
        NUM_LOCK = "NumLock",
        SCROLL_LOCK = "ScrollLock",
        SHIFT = "Shift",
        SUPER = "Super",
        SYMBOL = "Symbol",
        SYMBOL_LOCK = "SymbolLock"
    };

    export enum WHITESPACE_KEYS {
        ENTER = "Enter",
        TAB = "Tab",
        SPACE = ' '
    };

    export enum NAVIGATION_KEYS {
        ARROW_DOWN= "ArrowDown",
        ARROW_LEFT= "ArrowLeft",
        ARROW_RIGHT = "ArrowRight",
        ARROW_UP= "ArrowUp",
        END = "End",
        HOME= "Home",
        PAGE_DOWN= "PageDown",
        PAGE_UP= "PageUp"
    }

    export enum EDITING_KEYS {
        BACKSPACE= "Backspace",
        CLEAR= "Clear",
        COPY = "Copy",
        CR_SEL= "CrSel",
        CUT = 'Cut',
        DELETE= 'Delete',
        ERASE_EOF= 'EraseEof',
        EX_SEL= 'ExSel',
        INSERT = 'Insert',
        PASTE = 'Paste',
        REDO = 'Redo',
        UNDO= 'Undo'
    };

    export enum UI_KEYS {
        ACCEPT = 'Accept',
        AGAIN = 'Again',
        ATTN = 'Attn',
        CANCEL = 'Cancel',
        CONTEXT_MENU = 'ContextMenu',
        ESCAPE = 'Escape',
        EXECUTE = 'Execute',
        FIND = 'Find',
        FINISH = 'Finish',
        HELP = 'Help',
        PAUSE = 'Pause',
        PLAY = 'Play',
        PROPS = 'Props',
        SELECT = 'Select',
        ZOOM_IN = 'ZoomIn',
        ZOOM_OUT = 'ZoomOut'
    }

    export enum DEVICE_KEYS {
        BRIGHTNESS_DOWN= 'BrightnessDown',
        BRIGHTNESS_UP= 'BrightnessUp',
        EJECT = 'Eject',
        LOG_OFF = 'LogOff',
        POWER = 'Power',
        POWER_OFF = 'PowerOff',
        PRINT_SCREEN = 'PrintScreen',
        HIBERNATE = 'Hibernate',
        STANDBY = 'Standby',
        WAKE_UP = 'WakeUp'
    }

    export enum IME_AND_COMPOSITION_KEYS {
        ALL_CANDIDATES = 'AllCandidates',
        ALPHANUMERIC = 'Alphanumeric',
        CODE_INPUT = 'CodeInput',
        COMPOSE = 'Compose',
        CONVERT = 'Convert',
        DEAD = 'Dead',
        FINAL_MODE = 'FinalMode',
        GROUP_FIRST = 'GroupFirst',
        GROUP_LAST = 'GroupLast',
        GROUP_NEXT = 'GroupNext',
        GROUP_PREVIOUS= 'GroupPrevious',
        MODE_CHANGE= 'ModeChange',
        NEXT_CANDIDATE= 'NextCandidate',
        NON_CONVERT = 'NonConvert',
        PREVIOUS_CANDIDATE= 'PreviousCandidate',
        PROCESS= 'Process',
        SINGLE_CANDIDATE= 'SingleCandidate'
    }

    export enum KOREAN_KEYS {
        HANGUL_MODE = 'HangulMode',
        HANJA_MODE = 'HanjaMode',
        JUNJA_MODE= 'JunjaMode'
    }

    export enum JAPANESE_KEYS {
        EISU= 'Eisu',
        HANKAKU= 'Hankaku',
        HIRAGANA= 'Hiragana',
        HIRAGANA_KATAKANA= 'HiraganaKatakana',
        KANA_MODE = 'KanaMode',
        KANJI_MODE = 'KanjiMode',
        KATAKANA= 'Katakana',
        ROMAJI= 'Romaji',
        ZENKAKU= 'Zenkaku',
        ZENKAKU_HANAKU= 'ZenkakuHanaku'
    }

    export enum FUNCTION_KEYS {
        F1 = 'F1',
        F2 = 'F2',
        F3 = 'F3',
        F4 = 'F4',
        F5 = 'F5',
        F6 = 'F6',
        F7 = 'F7',
        F8 = 'F8',
        F9 = 'F9',
        F10 = 'F10',
        F11 = 'F11',
        F12 = 'F12',
        F13 = 'F13',
        F14 = 'F14',
        F15 = 'F15',
        F16 = 'F16',
        F17 = 'F17',
        F18 = 'F18',
        F19 = 'F19',
        F20 = 'F20',
        SOFT_1= 'Soft1',
        SOFT_2= 'Soft2',
        SOFT_3= 'Soft3',
        SOFT_4= 'Soft4',
    }

    export enum PHONE_KEYS {
        APP_SWITCH= 'AppSwitch',
        CALL= 'Call',
        CAMERA = 'Camera',
        CAMERA_FOCUS= 'CameraFocus',
        END_CALL = 'EndCall',
        GO_BACK = 'GoBack',
        GO_HOME= 'GoHome',
        HEADSET_HOOK= 'HeadsetHook',
        LAST_NUMBER_REDIAL= 'LastNumberRedial',
        NOTIFICATION= 'Notification',
        MANNER_MODE= 'MannerMode',
        VOICE_DIAL= 'VoiceDial'
    }

    export enum MULTIMEDIA_KEYS {
        CHANNEL_DOWN= 'ChannelDown',
        CHANNEL_UP = 'ChannelUp',
        MEDIA_FAST_FORWARD= 'MediaFastForward',
        MEDIA_PAUSE= 'MediaPause',
        MEDIA_PLAY= 'MediaPlay',
        MEDIA_PLAY_PAUSE= 'MediaPlayPause',
        MEDIA_RECORD= 'MediaRecord',
        MEDIA_REWIND= 'MediaRewind',
        MEDIA_STOP= 'MediaStop',
        MEDIA_TRACK_NEXT= 'MediaTrackNext',
        MEDIA_TRACK_PREVIOUS = 'MediaTrackPrevious'
    };

    export enum AUDIO_CONTROL_KEYS {
        AUDIO_BALANCE_LEFT= 'AudioBalanceLeft',
        AUDIO_BALANCE_RIGHT= 'AudioBalanceRight',
        AUDIO_BASS_DOWN= 'AudioBassDown',
        AUDIO_BASS_BOOST_DOWN= 'AudioBassBoostDown',
        AUDIO_BASS_BOOST_TOGGLE= 'AudioBassBoostToggle',
        AUDIO_BASS_BOOST_UP= 'AudioBassBoostUp',
        AUDIO_BASS_UP = 'AudioBassUp',
        AUDIO_FADER_FRONT= 'AudioFaderFront',
        AUDIO_FADER_REAR= 'AudioFaderRear',
        AUDIO_SURROUND_MODE_NEXT = 'AudioSurroundModeNext',
        AUDIO_TREBLE_DOWN= 'AudioTrebleDown',
        AUDIO_TREBLE_UP = 'AudioTrebleUp',
        AUDIO_VOLUME_DOWN = 'AudioVolumeDown',
        AUDIO_VOLUME_MUTE = 'AudioVolumeMute',
        AUDIO_VOLUME_UP = 'AudioVolumeUp',
        MICROPHONE_TOGGLE = 'MicrophoneToggle',
        MICROPHONE_VOLUME_DOWN= 'MicrophoneVolumeDown',
        MICROPHONE_VOLUME_MUTE = 'MicrophoneVolumeMute',
        MICROPHONE_VOLUME_UP = 'MicrophoneVolumeUp'
    };

    export enum TV_CONTROL_KEYS {
        TV= 'TV',
        TV_3D_MODE= 'TV3DMode',
        TV_ANTENNA_CABLE= 'TVAntennaCable',
        TV_AUDIO_DESCRIPTION= 'TVAudioDescription',
        TV_AUDIO_DESCRIPTION_MIX_DOWN= 'TVAudioDescriptionMixDown',
        TV_AUDIO_DESCRIPTION_MIX_UP= 'TVAudioDescriptionMixUp',
        TV_CONTENTS_MENU= 'TVContentsMenu',
        TV_DATA_SERVICE= 'TVDataService',
        TV_INPUT= 'TVInput',
        TV_INPUT_COMPONENT_1= 'TVInputComponent1',
        TV_INPUT_COMPONENT_2= 'TVInputComponent2',
        TV_INPUT_COMPOSITE_1= 'TVInputComposite1',
        TV_INPUT_COMPOSITE_2= 'TVInputComposite2',
        TV_INPUT_HDMI_1= 'TVInputHDMI1',
        TV_INPUT_HDMI_2= 'TVInputHDMI2',
        TV_INPUT_HDMI_3= 'TVInputHDMI3',
        TV_INPUT_HDMI_4= 'TVInputHDMI4',
        TV_INPUT_VGA_1= 'TVInputVGA1',
        TV_MEDIA_CONTEXT= 'TVMediaContext',
        TV_NETWORK= 'TVNetwork',
        TV_NUMBER_ENTRY= 'TVNumberEntry',
        TV_POWER= 'TVPower',
        TV_RADIO_SERVICE= 'TVRadioService',
        TV_SATELLITE= 'TVSatellite',
        TV_SATELLITE_BS= 'TVSatelliteBS',
        TV_SATELLITE_CS= 'TVSatelliteCS',
        TV_SATELLITE_TOGGLE= 'TVSatelliteToggle',
        TV_TERRESTRIAL_ANALOG= 'TVTerrestrialAnalog',
        TV_TERRESTRIAL_DIGITAL= 'TVTerrestrialDigital',
        TV_TIMER= 'TVTimer'
    }

    export enum MEDIA_CONTROLLER_KEYS {
        AVR_INPUT= 'AVRInput',
        AVR_POWER= 'AVRPower',
        COLOR_F0_RED= 'ColorF0Red',
        COLOR_F1_GREEN= 'ColorF1Green',
        COLOR_F2_YELLOW= 'ColorF2Yellow',
        COLOR_F3_BLUE= 'ColorF3Blue',
        COLOR_F4_GREY= 'ColorF4Grey',
        COLOR_F5_BROWN= 'ColorF5Brown',
        CLOSED_CAPTION_TOGGLE= 'ClosedCaptionToggle',
        DIMMER= 'Dimmer',
        DISPLAY_SWAP= 'DisplaySwap',
        DVR= 'DVR',
        EXIT= 'Exit',
        FAVORITE_CLEAR_0= 'FavoriteClear0',
        FAVORITE_CLEAR_1= 'FavoriteClear1',
        FAVORITE_CLEAR_2= 'FavoriteClear2',
        FAVORITE_CLEAR_3= 'FavoriteClear3',
        FAVORITE_RECALL_0= 'FavoriteRecall0',
        FAVORITE_RECALL_1= 'FavoriteRecall1',
        FAVORITE_RECALL_2= 'FavoriteRecall2',
        FAVORITE_RECALL_3= 'FavoriteRecall3',
        FAVORITE_STORE_0= 'FavoriteStore0',
        FAVORITE_STORE_1= 'FavoriteStore1',
        FAVORITE_STORE_2= 'FavoriteStore2',
        FAVORITE_STORE_3= 'FavoriteStore3',
        GUIDE= 'Guide',
        GUIDE_NEXT_DAY= 'GuideNextDay',
        GUIDE_PREVIOUS_DAY= 'GuidePreviousDay',
        INFO= 'Info',
        INSTANT_REPLAY= 'InstantReplay',
        LINK= 'Link',
        LIST_PROGRAM= 'ListProgram',
        LIVE_CONTENT= 'LiveContent',
        LOCK= 'Lock',
        MEDIA_APPS= 'MediaApps',
        MEDIA_AUDIO_TRACK= 'MediaAudioTrack',
        MEDIA_LAST= 'MediaLast',
        MEDIA_SKIP_BACKWARD= 'MediaSkipBackward',
        MEDIA_SKIP_FORWARD= 'MediaSkipForward',
        MEDIA_STEP_BACKWARD= 'MediaStepBackward',
        MEDIA_STEP_FORWARD= 'MediaStepForward',
        MEDIA_TOP_MENU= 'MediaTopMenu',
        NAVIGATE_IN= 'NavigateIn',
        NAVIGATE_NEXT= 'NavigateNext',
        NAVIGATE_OUT= 'NavigateOut',
        NAVIGATE_PREVIOUS= 'NavigatePrevious',
        NEXT_FAVORITE_CHANNEL= 'NextFavoriteChannel',
        NEXT_USER_PROFILE= 'NextUserProfile',
        ON_DEMAND= 'OnDemand',
        PAIRING= 'Pairing',
        PIN_P_DOWN= 'PinPDown',
        PIN_P_MOVE= 'PinPMove',
        PIN_P_TOGGLE= 'PinPToggle',
        PIN_P_UP= 'PinPUp',
        PLAY_SPEED_DOWN= 'PlaySpeedDown',
        PLAY_SPEED_RESET= 'PlaySpeedReset',
        PLAY_SPEED_UP= 'PlaySpeedUp',
        RANDOM_TOGGLE= 'RandomToggle',
        RC_LOW_BATTERY= 'RcLowBattery',
        RECORD_SPEED_NEXT= 'RecordSpeedNext',
        RF_BYPASS= 'RfBypass',
        SCAN_CHANNELS_TOGGLE= 'ScanChannelsToggle',
        SCREEN_MODE_NEXT= 'ScreenModeNext',
        SETTINGS= 'Settings',
        SPLIT_SCREEN_TOGGLE= 'SplitScreenToggle',
        STB_INPUT= 'STBInput',
        STB_POWER= 'STBPower',
        SUBTITLE= 'Subtitle',
        TELETEXT= 'Teletext',
        VIDEO_MODE_NEXT= 'VideoModeNext',
        WINK= 'Wink',
        ZOOM_TOGGLE= 'ZoomToggle'
    }

    export enum SPEECH_RECOGNITION_KEYS {
        SPEECH_CORRECTION_LIST= 'SpeechCorrectionList',
        SPEECH_INPUT_TOGGLE= 'SpeechInputToggle'
    }

    export enum DOCUMENT_KEYS {
        CLOSE = 'Close',
        NEW = 'New',
        OPEN = 'Open',
        PRINT = 'Print',        
        SAVE = 'Save',
        SPELL_CHECK = 'SpellCheck',
        MAIL_FORWARD = 'MailForward',
        MAIL_REPLY = 'MailReply',
        MAIL_SEND = 'MailSend'
    }

    export enum APPLICATION_SELECTOR_KEYS {
        LAUNCH_CALCULATOR = 'LaunchCalculator',
        LAUNCH_CALENDAR = 'LaunchCalendar',
        LAUNCH_CONTACTS = 'LaunchContacts',
        LAUNCH_MAIL = 'LaunchMail',
        LAUNCH_MEDIA_PLAYER = 'LaunchMediaPlayer',
        LAUNCH_MUSIC_PLAYER = 'LaunchMusicPlayer',
        LAUNCH_MY_COMPUTER = 'LaunchMyComputer',
        LAUNCH_PHONE = 'LaunchPhone',
        LAUNCH_SCREEN_SAVER = 'LaunchScreenSaver',
        LAUNCH_SPREADSHEET = 'LaunchSpreadsheet',
        LAUNCH_WEB_BROWSER = 'LaunchWebBrowser',
        LAUNCH_WEB_CAM = 'LaunchWebCam',
        LAUNCH_WORD_PROCESSOR = 'LaunchWordProcessor',
        LAUNCH_APPLICATION_1 = 'LaunchApplication1',
        LAUNCH_APPLICATION_2 = 'LaunchApplication2',
        LAUNCH_APPLICATION_3 = 'LaunchApplication3',
        LAUNCH_APPLICATION_4 = 'LaunchApplication4',
        LAUNCH_APPLICATION_5 = 'LaunchApplication5',
        LAUNCH_APPLICATION_6 = 'LaunchApplication6',
        LAUNCH_APPLICATION_7 = 'LaunchApplication7',
        LAUNCH_APPLICATION_8 = 'LaunchApplication8',
        LAUNCH_APPLICATION_9 = 'LaunchApplication9',
        LAUNCH_APPLICATION_10 = 'LaunchApplication10',
        LAUNCH_APPLICATION_11 = 'LaunchApplication11',
        LAUNCH_APPLICATION_12 = 'LaunchApplication12',
        LAUNCH_APPLICATION_13 = 'LaunchApplication13',
        LAUNCH_APPLICATION_14 = 'LaunchApplication14',
        LAUNCH_APPLICATION_15 = 'LaunchApplication15',
        LAUNCH_APPLICATION_16 = 'LaunchApplication16'
    }

    export enum BROWSER_CONTROL_KEYS {
        BROWSER_BACK = 'BrowserBack',
        BROWSER_FAVORITES = 'BrowserFavorites',
        BROWSER_FORWARD = 'BrowserForward',
        BROWSER_HOME = 'BrowserHome',
        BROWSER_REFRESH = 'BrowserRefresh',
        BROWSER_SEARCH = 'BrowserSearch',
        BROWSER_STOP = 'BrowserStop',
    }

    export enum NUMERIC_KEYPAD_KEYS {
        DECIMAL = 'Decimal',
        KEY_11 = 'Key11',
        KEY_12 = 'Key12',
        MULTIPLY = 'Multiply',
        ADD = 'Add',
        CLEAR = 'Clear',
        DIVIDE = 'Divide',
        SUBTRACT = 'Subtract',
        SEPARATOR = 'Separator',
        KEYPAD_0 = '0',
        KEYPAD_1 = '1',
        KEYPAD_2 = '2',
        KEYPAD_3 = '3',
        KEYPAD_4 = '4',
        KEYPAD_5 = '5',
        KEYPAD_6 = '6',
        KEYPAD_7 = '7',
        KEYPAD_8 = '8',
        KEYPAD_9 = '9'
    }

    export class Helper {
        private static _allValues : Array<string>;

        public static isNamedKeyAttributeValue(value:string){
            return this._allValues.indexOf(value) >= 0;
        }
    
        public static initialize(){
            this._allValues = Object.values(MODIFIER_KEYS).map(key => key.toString())
                                    .concat(Object.values(WHITESPACE_KEYS))
                                    .concat(Object.values(NAVIGATION_KEYS))
                                    .concat(Object.values(EDITING_KEYS))
                                    .concat(Object.values(UI_KEYS))
                                    .concat(Object.values(DEVICE_KEYS))
                                    .concat(Object.values(IME_AND_COMPOSITION_KEYS))
                                    .concat(Object.values(KOREAN_KEYS))
                                    .concat(Object.values(JAPANESE_KEYS))
                                    .concat(Object.values(FUNCTION_KEYS))
                                    .concat(Object.values(PHONE_KEYS))
                                    .concat(Object.values(MULTIMEDIA_KEYS))
                                    .concat(Object.values(AUDIO_CONTROL_KEYS))
                                    .concat(Object.values(TV_CONTROL_KEYS))
                                    .concat(Object.values(MEDIA_CONTROLLER_KEYS))
                                    .concat(Object.values(SPEECH_RECOGNITION_KEYS))
                                    .concat(Object.values(DOCUMENT_KEYS))
                                    .concat(Object.values(APPLICATION_SELECTOR_KEYS))
                                    .concat(Object.values(BROWSER_CONTROL_KEYS))
                                    .concat(Object.values(NUMERIC_KEYPAD_KEYS))
                                    .sort();
        }
    }

    Helper.initialize();    

}