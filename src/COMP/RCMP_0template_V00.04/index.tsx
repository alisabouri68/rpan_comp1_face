//@ts-nocheck
/******************************************
Component Templates

Last Update:    2025.08.06
By:             SMRT.00

Description:  This templates is used for developing React Components according to Smart-Comp Architecture
******************************************/

/*------------------------------------------------------------
Meta Data

ID:             RCMP_template 
Title:          Component Template - React Version
Version:        V00.04
VAR:            01 (remarks ....)

last-update:    D2025.07.12
owner:          SMRT.00

Description:    Here ...

------------------------------------------------------------*/

/**************************************
 * Step 01 import dependencies - kernels
 **************************************/

// Importing React and essential hooks:
// - useState: to manage local state.
// - useEffect: to perform side effects like API calls or logging.
// - useCallback: to memoize functions to avoid unnecessary re-creations.
// - useMemo: to memoize computed values for performance.
// - memo: to wrap the component and prevent unnecessary re-renders.

// import { useState, useEffect, useCallback, useMemo, memo } from 'react'

/**************************************
 * Step.02:    import dependency - widgets
 **************************************/

//  import MicroWidg.formControl.microButton from "../M_WIDGs";  // i.e. mWidg01 = microButton
//  import MicroWidg.formControl.microButton from "../M_WIDGs";
//  import MicroWidg.formControl.microButton from "../M_WIDGs";

/**************************************
 * Step.03:    co-actor dependencies
 **************************************/

// import { useGlob } from './useGlob'; // Hook to access global environment variables
// import { useSrvSet } from './useSrvSet'; // Hook to access service/plug settings
// import { cloneObject } from './utils'; // Utility to deep clone objects

/**************************************
 * Step 04 - define properties - Static
 *
 * assignment:
 *
 *    1- static assign    (glan Syntax - a:5      )   a=5
 *    2- set a            (glan Syntax - a:b      )   a=b
 *    3- a follow b       (glan Syntax - a<<b     )   Hook (Read)
 *                                    if b plug:
 *
 *                                    if b is envi var:
 *
 *
 *    4- bind a , b       (glan Syntax - a=b      )   Hook (Read-Write)
 *                                    if b plug:
 *
 *                                    if b is envi var:
 *
 *
 **************************************/

/**************************************
 * Step 05 - define property interface for this BioWidget
 **************************************/
// interface Props {
//     geo: {
//         bG01: number;           //type = number
//         bG02: number;           //type = number
//         bG03: number;           //type = number
//         bG04: number;           //type = number
//     };

//     logic: {
//         title: string;          // Static
//         icon: string;           // Static
//         state: string;          // Dynamic
//         bL04: string;           // follow (Envi-Read)
//     };

//     style: {
//         bs01: string;
//         bs02: string;
//         bs03: string;
//     };
// }

/**************************************
 * Step 06 - Calculation and Logical Fuctions should be defined if needed
 *
 **************************************/

// function calcultation1() {}
// function calcultation2() {}

/**************************************
 * Step 07 - Class Component should be defined
 *
 **************************************/

// function init(props) {

/**************************************
 * Step 07 - assignments for this BioWidget
 *	assignments will be perform in the build time.
 *
 *		we have 7 types of Assignments:
 *
 *			1- S:       static
 *          2- D:       Dynamic
 *			3- EnvR:    Envi Read
 *			4- EnvRW:   Envi Read and Write
 *			5- PlugR:   Plug Read
 *			6- PlugRW:  Plug Read and write
 *			7- PlugC:   Plug Controllers Configure
 *
 **************************************/

// --------------------------------------------------------------------------
// 07-1- Type S (Static Assignment)
// Static assignments are set at build-time and remain constant.
// Here, we assign a static value to bWidg1.S1 and set a default widget height.
// --------------------------------------------------------------------------

// const bWidg1 = {}; // Object to hold static assignments

// if (logic.title = "") {

//     bWidg1.S1 = '34';               // Static assignment for S1 (default value if not set from parents)
//     const DEFAULT_HEIGHT = 8;

// }

// --------------------------------------------------------------------------
// 2- Dynamic

// --------------------------------------------------------------------------

// const {globVar2} = useGlob ();

// --------------------------------------------------------------------------
// 3- Type EnvR (Envi Read)
// Environment Read bindings allow you to read values from the global environment.
// In this example, we use a custom hook (useGlob) to get environment variables,
// then use useMemo to memoize the value so that bS02 only updates when globEnvi.par01 changes.
// --------------------------------------------------------------------------

// const { globEnviVar1 } = useGlob()

// const bS02 = useMemo(() => {
//   return globEnviVar1.par01
// }, [globEnviVar1.par01])

// --------------------------------------------------------------------------
// 4- Type EnvRW (Envi Read and Write)
// These bindings enable both reading and writing to environment variables.
// We retrieve the current value and a function to update it via useGlob.
// The local state bs02 is synchronized with the global environment variable (par01)
// using two useEffect hooks (one for updating global state when bs02 changes,
// and one for updating local state when the global value changes).
// --------------------------------------------------------------------------

// const { globEnvi: envForRW, changeGlobEnvi } = useGlob()
// const [bs02, setBs02] = useState(envForRW.par01)

// Update the global environment variable when local bs02 changes.
// useEffect(() => {
//   changeGlobEnvi('par01', bs02)
// }, [bs02, changeGlobEnvi])

// // Update local state when the global environment variable changes.
// useEffect(() => {
//   setBs02(envForRW.par01)
// }, [envForRW.par01])

// --------------------------------------------------------------------------
// 5- Type PlugR (Plug Read)
// Plug Read bindings allow you to retrieve data from a plug set in a service context.
// We use a custom hook (useSrvSet) to access plug sets and then memoize
// the retrieved data (bs05PlugR) to avoid unnecessary recalculations.
// A controller object (dummy in this example) provides a parameter for filtering.
// --------------------------------------------------------------------------
// const { plugSet, getPlugSet, updatePlugSet } = useSrvSet()
// // Dummy controller for demonstration purposes.
// const controller = { machSer: '12345' }

// const bs05PlugR = useMemo(() => {
//   return getPlugSet('convas1', 'plug12', 'index', controller.machSer)
// }, [plugSet?.convas1?.plug12, getPlugSet, controller.machSer])

// --------------------------------------------------------------------------
// 6- Type PlugRW (Plug Read and Write)
// Plug Read and Write bindings allow you to both retrieve and update data
// within a plug set. Local state (bs05) is initialized from the plug set and
// synchronized using useEffect. The onChangeData function demonstrates how to
// update a specific field in the plug set and persist the change using updatePlugSet.
// --------------------------------------------------------------------------
// const [bs05, setBs05] = useState(plugSet.convas1.plug12)

// Synchronize local state with changes in the plug set.
// useEffect(() => {
//   setBs05(getPlugSet('convas1', 'plug12', 'index', controller.machSer))
// }, [plugSet?.convas1?.plug12, getPlugSet, controller.machSer])

// // Function to update a specific field in bs05 and persist the change.
// /
// )

// --------------------------------------------------------------------------
// 6- Type PlugC (Plug Controllers)
// Plug Controller bindings allow you to configure aspects of plug data retrieval,
// such as pagination. In this example, a dropdown changes the pageSize, which
// causes the results (retrieved from getPlugSet) to be recalculated.
// --------------------------------------------------------------------------

// 2. Side Effect (example: logging or API call)
// useEffect is used here to log when the component mounts or when the `count` changes.
// It also provides a cleanup function that runs before the component unmounts or before the next effect runs.
// This is useful for debugging or performing API calls.
// useEffect(() => {
//   console.log('Component mounted or count changed:', count)
//   return () => {
//     console.log('Cleanup on unmount or before next effect')
//   }
// }, [count])

// 3. Memoized Callbacks
// These functions are memoized with useCallback, which ensures that the functions are not re-created on every render.
// This is especially important when passing these callbacks to child components to prevent unnecessary re-renders.
// const handleIncrement = useCallback(() => {
//   setCount(prev => prev + 1)
// }, []) // No dependencies, so this function is created only once.

// const handleInputChange = useCallback(e => {
//   // Updates the inputValue state when the text input changes.
//   setInputValue(e.target.value)
// }, []) // No dependencies, so this function is created only once.

// 4. Derived Memoized Value
// useMemo is used to compute a derived value (the reversed string of inputValue) and memoize it.
// This avoids recalculating the reversed string on every render unless inputValue changes.
// const reversedInput = useMemo(() => {
//   console.log('Calculating reversed input')
//   return inputValue.split('').reverse().join('')
// }, [inputValue]) // Dependency array: recalculates only when inputValue changes.

// 5. Render
// The component renders a simple UI:
// - An input box for user text.
// - A display of the reversed input.
// - A counter with an "Increment" button.
// Tailwind CSS classes are used for styling.
//     return (
//         <div className="p-4 rounded-xl my-custom-card max-w-sm mx-auto ">
//             <h2 className="text-xl font-semibold mb-2">React Memo Template</h2>

//             <div className="mb-4">
//                 <label className="block mb-1">Input</label>
//                 <input
//                     type="text"
//                     value={inputValue}
//                     onChange={handleInputChange}
//                     className="w-full border p-2 rounded-md"
//                 />
//             </div>

//             <div className="mb-4">
//                 <p className="text-stone-700">
//                     Reversed: <strong>{reversedInput}</strong>
//                 </p>
//             </div>

//             <div className="flex items-center justify-between">
//                 <p className="text-stone-800">
//                     Count: <strong>{count}</strong>
//                 </p>
//                 <button
//                     onClick={handleIncrement}
//                     className="px-3 py-1 rounded-md">
//                     Increment
//                 </button>
//             </div>
//         </div>
//     );
// }

// The component is wrapped with memo()
// - memo() is used to prevent unnecessary re-renders by comparing the previous props with the new ones.
// - If props have not changed, React skips re-rendering this component.
// This is particularly beneficial for performance when the component is heavy or renders frequently.
// export default memo(MyComponent);
