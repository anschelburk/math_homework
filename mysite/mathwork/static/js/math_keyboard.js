// document.addEventListener("DOMContentLoaded", function() {
//     const mathFieldElement = document.getElementById('mathfield');
//     mathFieldElement.addEventListener('input', () => {
//         console.log(mathFieldElement.value); // This will log the LaTeX content
//     });
// });
document.querySelector('math-field').
addEventListener('focus', () => {
    mathVirtualKeyboard.layouts = "default";
    
    // IN PROGRESS: CUSTOM MATH KEYBOARD

    // mathVirtualKeyboard.layouts = [
    //     {
    //         label: "Arithmetic",
    //         tooltip: "Math Keyboard for Basic Arithmetic",
    //         layers: [
    //             {
    //                 rows: [
    //                     [
    //                         { label: '[separator]', width: 0.5 },
    //                         "[up]",
    //                         { label: '[separator]', width: 1 },
    //                         "[1]",
    //                         "[2]",
    //                         "[3]",
    //                         { label: '[separator]', width: 0.5 },
    //                         "x",
    //                         { label: '[separator]', width: 0.5 },
    //                         "[(]",
    //                         "[)]",
    //                         { label: '[separator]', width: 0.5 },
    //                         "\\approx",
    //                         "\\neq",
    //                         { label: '[separator]', width: 0.5 },
    //                         "\\frac{#@}{#?}",
    //                         "!",
    //                         { label: '[separator]', width: 0.5 },
    //                     ],
    //                     [
    //                         "[left]",
    //                         "[right]",
    //                         { label: '[separator]', width: 0.5 },
    //                         "[4]",
    //                         "[5]",
    //                         "[6]",
    //                         { label: '[separator]', width: 0.5 },
    //                         "y",
    //                         { label: '[separator]', width: 0.5 },
    //                         "+",
    //                         "-",
    //                         { label: '[separator]', width: 0.5 },
    //                         ">",
    //                         "<",
    //                         { label: '[separator]', width: 0.5 },
    //                         "\\[#@]^2",
    //                         "\\[#@]^[#0]",
    //                         { label: '[separator]', width: 0.5 },
    //                     ],
    //                     [
    //                         { label: '[separator]', width: 0.5 },
    //                         "[down]",
    //                         { label: '[separator]', width: 1 },
    //                         "[7]",
    //                         "[8]",
    //                         "[9]",
    //                         { label: '[separator]', width: 0.5 },
    //                         "m",
    //                         { label: '[separator]', width: 0.5 },
    //                         "\\times",
    //                         "\\div",
    //                         { label: '[separator]', width: 0.5 },
    //                         "\\ge",
    //                         "\\le",
    //                         { label: '[separator]', width: 0.5 },
    //                         "\\sqrt{#@}",
    //                         "\\sqrt[#0]{#}@",
    //                         { label: '[separator]', width: 0.5 },
    //                     ],
    //                     [
    //                         { label: "spacebar", latex: "\\quad", width: 2 },
    //                         { label: '[separator]', width: 0.5 },
    //                         { label: "[0]", width: 2},
    //                         "[.]",
    //                         { label: '[separator]', width: 0.5 },
    //                         "b",
    //                         { label: '[separator]', width: 0.5 },
    //                         { label: "hrule*", latex: "\\hrule", width: 2},
    //                         { label: '[separator]', width: 0.5 },
    //                         { label: "----*", latex: "\\hrule", width: 2 },
    //                         { label: '[separator]', width: 0.5 },
    //                         { label: '[separator]', width: 2 },
    //                         { label: '[separator]', width: 0.5 },
    //                     ],
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         label: "Algebra",
    //         tooltip: "Keyboard for Algebra",
    //         layers: [
    //             {
    //                 rows: [
    //                     [
    //                         { label: '[separator]', width: 0.5 },
    //                         "[up]",
    //                         { label: '[separator]', width: 1 },
    //                         "=", "\\not =",
    //                         { label: '[separator]', width: 0.5 },
    //                         "(", ")",
    //                         { label: '[separator]', width: 0.5 },
    //                         "1", "2", "3",
    //                         { label: '[separator]', width: 0.5 },
    //                         "#@^{#?}", "\\sqrt{#@}", "\\sqrt[#?]{#@}",
    //                     ],
    //                     [
    //                         "[left]", "[right]",
    //                         { label: '[separator]', width: 0.5 },
    //                         ">", "<",
    //                         { label: '[separator]', width: 0.5 },
    //                         "+", "-",
    //                         { label: '[separator]', width: 0.5 },
    //                         "4", "5", "6",
    //                         { label: '[separator]', width: 0.5 },
    //                         "|#@|", "\\log({#@})", "\\log_#?({#@})",
    //                     ],
    //                     [
    //                         { label: '[separator]', width: 0.5 },
    //                         "[down]",
    //                         { label: '[separator]', width: 1 },
    //                         "\\ge", "\\le",
    //                         { label: '[separator]', width: 0.5 },
    //                         "\\times", "\\frac{#@}{#?}",
    //                         { label: '[separator]', width: 0.5 },
    //                         "7", "8", "9",
    //                         { label: '[separator]', width: 0.5 },
    //                         "\\sin({#@})", "\\cos({#@})", "\\tan({#@})",
    //                     ],
    //                     [
    //                         { label: '[separator]', width: 2 },
    //                         { label: '[separator]', width: 0.5 },
    //                         { label: '[hrule]', latex: '[hrule]', width: 2 },
    //                         { label: '[separator]', width: 0.5 },
    //                         "x", "y",
    //                         // { label: 'typing', latex: "\\text{#0}", width: 2 },
    //                         { label: '[separator]', width: 0.5 },
    //                         "0", "=", ".",
    //                         { label: '[separator]', width: 0.5 },
    //                         "\\sin^{-1}({#@})", "\\cos^{-1}({#@})", "\\tan^{-1}({#@})",
    //                     ],
    //                 ],
    //             },
    //         ],
    //     },
    //     "alphabetic",
    // ];

mathVirtualKeyboard.visible = true;
});