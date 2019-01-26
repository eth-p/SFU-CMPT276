//! --------------------------------------------------------------------------------------------------------------------
//! Copyright (C) 2019 Team Chipotle
//! MIT License
//! --------------------------------------------------------------------------------------------------------------------
import {Settings, Setting} from '@chipotle/web/Settings';
// ---------------------------------------------------------------------------------------------------------------------
class EmulatorSettings extends Settings {
	@Setting(500)
	public cpu_speed?: number;

	@Setting(true)
	public show_keypad?: boolean;

	@Setting(false)
	public show_registers?: boolean;

	@Setting(false)
	public show_disassembler?: boolean;

	@Setting(false)
	public enable_debugger?: boolean;

	@Setting('#ffffff')
	public screen_foreground?: string;

	@Setting('#000000')
	public screen_background?: string;

	@Setting('0')
	public keybind_key_0?: string;

	@Setting('1')
	public keybind_key_1?: string;

	@Setting('2')
	public keybind_key_2?: string;

	@Setting('3')
	public keybind_key_3?: string;

	@Setting('4')
	public keybind_key_4?: string;

	@Setting('5')
	public keybind_key_5?: string;

	@Setting('6')
	public keybind_key_6?: string;

	@Setting('7')
	public keybind_key_7?: string;

	@Setting('8')
	public keybind_key_8?: string;

	@Setting('9')
	public keybind_key_9?: string;

	@Setting('A')
	public keybind_key_A?: string;

	@Setting('B')
	public keybind_key_B?: string;

	@Setting('C')
	public keybind_key_C?: string;

	@Setting('D')
	public keybind_key_D?: string;

	@Setting('E')
	public keybind_key_E?: string;

	@Setting('F')
	public keybind_key_F?: string;
}
// ---------------------------------------------------------------------------------------------------------------------
const settings = new EmulatorSettings('emulator');
export default settings;
