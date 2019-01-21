//! --------------------------------------------------------------------------------------------------------------------
//! Copyright (C) 2019 Team Chipotle
//! MIT License
//! --------------------------------------------------------------------------------------------------------------------
import assert from '@chipotle/types/assert';

import Bitfield from '@chipotle/types/Bitfield';
import {default as Uint8, bitscanf, bitscanr, BITS as UINT8_BITS} from '@chipotle/types/Uint8';
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Chip-8 sprite.
 *
 * An 8x`n` sprite represented by the bits in `n` integers.
 */
export default class ChipSprite {
	// -------------------------------------------------------------------------------------------------------------
	// | Constants:                                                                                                |
	// -------------------------------------------------------------------------------------------------------------

	/**
	 * The width of a sprite.
	 */
	public readonly MAX_WIDTH = 8;

	/**
	 * The maximum height of a sprite.
	 * See http://devernay.free.fr/hacks/chip8/C8TECH10.HTM#2.4
	 */
	public readonly MAX_HEIGHT = 15;

	// -------------------------------------------------------------------------------------------------------------
	// | Fields:                                                                                                   |
	// -------------------------------------------------------------------------------------------------------------

	/**
	 * The sprite data.
	 */
	public buffer: Uint8[] | Uint8Array;

	/**
	 * The sprite width.
	 */
	public width: number;

	/**
	 * The sprite height.
	 */
	public height: number;

	// -------------------------------------------------------------------------------------------------------------
	// | Constructor:                                                                                              |
	// -------------------------------------------------------------------------------------------------------------

	/**
	 * Creates a new sprite.
	 *
	 * If `offset` and `height` are provided, it will take a slice of the `sprite` variable.
	 *
	 * @param sprite The sprite data.
	 * @param offset The offset starting index of the sprite.
	 * @param height The sprite height.
	 */
	public constructor(sprite: Uint8[] | Uint8Array, offset?: number, height?: number) {
		if (offset === undefined || height === undefined) {
			this.buffer = sprite;
		} else {
			this.buffer = sprite.slice(offset, offset + height);
		}

		this.width = 8;
		this.height = this.buffer.length;

		assert(this.buffer.length <= this.MAX_HEIGHT, 'Invalid sprite buffer');
	}

	// -------------------------------------------------------------------------------------------------------------
	// | Methods:                                                                                                  |
	// -------------------------------------------------------------------------------------------------------------

	/**
	 * Creates a string representation of the sprite.
	 * This should be used primarily for debugging purposes.
	 *
	 * @returns A nicely-formatted representation of the sprite.
	 */
	public toString(): string {
		let buffer = Array.from(this.buffer);

		let leftOffset = 7 - Math.max(...buffer.map(x => (x === 0 ? Number.MIN_SAFE_INTEGER : bitscanr(x))));
		let rightOffset = 7 - Math.min(...buffer.map(x => (x === 0 ? Number.MAX_SAFE_INTEGER : bitscanf(x))));

		return buffer
			.map(x => new Bitfield(x, UINT8_BITS).toArray())
			.map(x => x.slice(leftOffset, rightOffset + 1))
			.map(x => x.map(y => (y ? 'X' : ' ')).join(''))
			.join('\n');
	}

	/**
	 * Creates an array of bitfields that represent the sprite.
	 * @returns An array of bitfields, one per line.
	 */
	public toBitfield(): Bitfield[] {
		return Array.from(this.buffer).map(x => new Bitfield(x, UINT8_BITS));
	}
}
