//! --------------------------------------------------------------------------------------------------------------------
//! Copyright (C) 2019 Team Chipotle
//! MIT License
//! --------------------------------------------------------------------------------------------------------------------
import {Instruction, or} from '@chipotle/isa/Instruction';

import ProgramAddress from './ProgramAddress';
import ProgramSource from './ProgramSource';
import VMError from './VMError';

import assert from '@chipotle/types/assert';
// ---------------------------------------------------------------------------------------------------------------------

/**
 * An executable program that can run in the virtual machine.
 */
export default class Program<A> {
	// -------------------------------------------------------------------------------------------------------------
	// | Fields:                                                                                                   |
	// -------------------------------------------------------------------------------------------------------------

	/**
	 * The program data.
	 */
	public data: Uint8Array | null;

	/**
	 * The program loader function.
	 */
	protected loader: (source: ProgramSource) => Promise<Uint8Array | false>;

	// -------------------------------------------------------------------------------------------------------------
	// | Constructor:                                                                                              |
	// -------------------------------------------------------------------------------------------------------------

	/**
	 * Creates a new executable program.
	 *
	 * @param loader A function.
	 */
	public constructor(loader: (source: ProgramSource) => Promise<Uint8Array | false>) {
		this.data = null;
		this.loader = loader;
	}

	// -------------------------------------------------------------------------------------------------------------
	// | Methods:                                                                                                  |
	// -------------------------------------------------------------------------------------------------------------

	/**
	 * Loads a program.
	 * @param source The source of the program.
	 */
	public async load(source: ProgramSource) {
		let data = await this.loader(source);
		if (data === false) {
			throw new VMError(`NO PROGRAM LOADER FOR TYPE: ${(<any>source).constructor.name}`);
		}

		this.data = data;
	}

	/**
	 * Fetches an instruction at an address.
	 *
	 * @param address The address to fetch from.
	 * @returns The fetched instruction.
	 */
	public fetch(address: ProgramAddress): Instruction {
		assert(address < this.data!.length - 1, "Parameter 'address' is out of bounds for program (over)");
		assert(address >= 0, "Parameter 'address' is out of bounds for program (over)");
		return or(this.data![address], this.data![address + 1]);
	}
}
