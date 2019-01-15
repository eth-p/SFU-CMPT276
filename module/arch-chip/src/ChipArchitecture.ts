//! --------------------------------------------------------------------------------------------------------------------
//! Copyright (C) 2019 Team Chipotle
//! MIT License
//! --------------------------------------------------------------------------------------------------------------------
import {default as Uint8} from '@chipotle/types/Uint8';

import Architecture from '@chipotle/vm/Architecture';
import ISA from '@chipotle/vm/ISA';
import OpAddress from '@chipotle/vm/OpAddress';
import ProgramStack from '@chipotle/vm/ProgramStack';
import VMContext from '@chipotle/vm/VMContext';

import ChipDisplay from './ChipDisplay';
// ---------------------------------------------------------------------------------------------------------------------
import OP_SYS from './OP_SYS';
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Chip-8 Architecture.
 *
 * 16 Data Registers: register_data[0x0 to 0xF]
 * 1  Addr Register:  register_addr
 * 4k Memory:         memory
 * 64x32 Display:     display
 */
export default class ChipArchitecture extends Architecture<ChipArchitecture> {
	public static readonly ISA: ISA<ChipArchitecture> = [OP_SYS];

	// -------------------------------------------------------------------------------------------------------------
	// | Constants:                                                                                                |
	// -------------------------------------------------------------------------------------------------------------

	/**
	 *  The maximum size of the Chip-8's memory.
	 */
	public readonly MAX_MEMORY = 4096;

	/**
	 * The maximum number of data registers.
	 * V0 to VF.
	 */
	public readonly REGISTER_MAX = 16;

	/**
	 * The maximum number of entries in the stack.
	 */
	public readonly MAX_STACK = 16;

	// -------------------------------------------------------------------------------------------------------------
	// | Fields:                                                                                                   |
	// -------------------------------------------------------------------------------------------------------------

	/**
	 * The data registers.
	 * V0 to VF.
	 */
	public register_data: Uint8Array;

	/**
	 * The random access memory.
	 */
	public memory: Uint8Array;

	/**
	 * The call stack.
	 */
	public stack: ProgramStack;

	/**
	 * The display.
	 */
	public display: ChipDisplay;

	// -------------------------------------------------------------------------------------------------------------
	// | Accessors:                                                                                                |
	// -------------------------------------------------------------------------------------------------------------

	/**
	 * The flag register.
	 * This is an alias for the VF register.
	 */
	public get register_flag(this: VMContext<ChipArchitecture>): Uint8 {
		return this.register_data[0xf];
	}

	public set register_flag(this: VMContext<ChipArchitecture>, value: Uint8) {
		this.register_data[0xf] = value;
	}

	/**
	 * The address register.
	 * This stores a pointer to the currently-executing instruction.
	 */
	public get register_addr(this: VMContext<ChipArchitecture>): OpAddress {
		return this.program_counter;
	}

	/**
	 * A wrapper around ${VM#program_data}.
	 * This architecture shares memory space and program data.
	 *
	 * @override
	 */
	public get program_data(this: VMContext<ChipArchitecture>): Uint8Array {
		return this.memory;
	}

	// -------------------------------------------------------------------------------------------------------------
	// | Constructor:                                                                                              |
	// -------------------------------------------------------------------------------------------------------------

	/**
	 * Creates a new instance of the Chip-8 architecture.
	 * A unique instance should be passed to the {@link VM} constructor.
	 */
	public constructor() {
		super(ChipArchitecture.ISA);

		this.register_data = new Uint8Array(this.REGISTER_MAX);
		this.memory = new Uint8Array(this.MAX_MEMORY);
		this.display = new ChipDisplay();
		this.stack = new ProgramStack(this.MAX_STACK);
	}
}
