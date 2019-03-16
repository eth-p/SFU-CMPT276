//! --------------------------------------------------------------------------------------------------------------------
//! Copyright (C) 2019 Team Chipotle
//! MIT License
//! --------------------------------------------------------------------------------------------------------------------
import JsonType from '@chipotle/types/JsonType';
// ---------------------------------------------------------------------------------------------------------------------

/**
 * A JSON-compatible snapshot of the virtual machine state.
 * This can be used for savestates or debugging.
 */
interface VMSnapshot {
	/**
	 * The architecture identifier.
	 * If this does not match, the snapshot was created with a different architecture.
	 */
	__ARCH: string;

	/**
	 * The snapshot format identifier.
	 * If this does not match, the snapshot was created from an old version.
	 */
	__VERS: number;

	/**
	 * A snapshot value.
	 */
	[key: string]: JsonType;
}

namespace VMSnapshot {
	export const VERSION = 1;
}

// ---------------------------------------------------------------------------------------------------------------------
export default VMSnapshot;
export {VMSnapshot};
