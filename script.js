function readSet(id) {
    const input = document.getElementById(id).value.trim();

    if (!input) {
        return new Set();
    }

    return new Set(
        input.split(",")
            .map(item => item.trim())
            .filter(item => item.length > 0)
    );
}

function union(A, B) {
    return new Set([...A, ...B]);
}

function intersection(A, B) {
    return new Set([...A].filter(item => B.has(item)));
}

function difference(A, B) {
    return new Set([...A].filter(item => !B.has(item)));
}

function formatSet(set) {
    return "{ " + [...set].join(", ") + " }";
}

function calculate(operation) {
    const A = readSet("setA");
    const B = readSet("setB");

    const common = intersection(A, B);
    const onlyA = difference(A, B);
    const onlyB = difference(B, A);

    document.getElementById("setDisplay").textContent =
        "Set A = " + formatSet(A) +
        " | Set B = " + formatSet(B);

    let result;
    let title;
    let explanation;

    switch (operation) {
        case "union":
            result = union(A, B);
            title = "Union (A ∪ B)";
            explanation =
                "Union contains every unique element present in A or B.";
            break;

        case "intersection":
            result = common;
            title = "Intersection (A ∩ B)";
            explanation =
                "Intersection contains only the elements common to both sets.";
            break;

        case "difference":
            result = onlyA;
            title = "Difference (A − B)";
            explanation =
                "This contains elements in A that are not present in B.";
            break;

        case "reverse":
            result = onlyB;
            title = "Difference (B − A)";
            explanation =
                "This contains elements in B that are not present in A.";
            break;

        case "symmetric":
            result = union(onlyA, onlyB);
            title = "Symmetric Difference (A △ B)";
            explanation =
                "This contains elements belonging to exactly one of the sets.";
            break;

        default:
            return;
    }

    document.getElementById("operationTitle").textContent = title;
    document.getElementById("result").textContent = formatSet(result);
    document.getElementById("explanation").textContent = explanation;

    document.getElementById("vennA").textContent =
        onlyA.size ? [...onlyA].join(", ") : "∅";

    document.getElementById("vennCommon").textContent =
        common.size ? [...common].join(", ") : "∅";

    document.getElementById("vennB").textContent =
        onlyB.size ? [...onlyB].join(", ") : "∅";
}

function loadSample() {
    document.getElementById("setA").value = "1, 2, 3, 4";
    document.getElementById("setB").value = "3, 4, 5, 6";

    calculate("union");
}

function resetAll() {
    document.getElementById("setA").value = "";
    document.getElementById("setB").value = "";

    document.getElementById("setDisplay").textContent =
        "Set A and Set B will appear here.";

    document.getElementById("operationTitle").textContent =
        "Choose an operation";

    document.getElementById("result").textContent = "{ }";

    document.getElementById("explanation").textContent =
        "Your result and explanation will appear here.";

    document.getElementById("vennA").textContent = "—";
    document.getElementById("vennCommon").textContent = "—";
    document.getElementById("vennB").textContent = "—";
}