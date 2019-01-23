//! --------------------------------------------------------------------------------------------------------------------
//! Copyright (C) 2019 Team Chipotle
//! MIT License
//! --------------------------------------------------------------------------------------------------------------------

/**
 * An optional value.
 *
 * If the optional does not contain a value, it will be undefined.
 */
type Optional<T> = T | undefined;
export default Optional;
export {Optional};
