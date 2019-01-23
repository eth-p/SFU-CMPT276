//! --------------------------------------------------------------------------------------------------------------------
//! Copyright (C) 2019 Team Chipotle
//! MIT License
//! --------------------------------------------------------------------------------------------------------------------
import Uint16 from '@chipotle/types/Uint16';

import OperandType from '@chipotle/isa/OperandType';
import Operation from '@chipotle/isa/Operation';

import Chip from './Chip';
// ---------------------------------------------------------------------------------------------------------------------

/**
 * CHIP-8 INSTRUCTION: SNE <reg> <reg>
 *
 * Skips the next instruction if the register at <reg> is not equal to the register at <reg>
 *
 * '9xy0'
 */
export default class OP_SNE_REG_REG extends Operation implements Chip.Interpreter {
	public constructor() {
		super('SNE', 0x9000, [
			{
				mask: 0x0f00,
				type: OperandType.REGISTER
			},
			{
				mask: 0x00f0,
				type: OperandType.REGISTER
			}
		]);
	}

	public execute(this: void, context: Chip.Context, p1: Uint16, p2: Uint16, p3: never): void {
		if (context.register_data[p1] !== context.register_data[p2]) {
			context.hopForwards(2);
		}
	}
}
