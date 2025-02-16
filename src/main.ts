import {generateReport} from "./report";

const reportInput = document.getElementById("reportId") as HTMLInputElement;
const generateReportBtn = document.getElementById("generateReport") as HTMLButtonElement;

function setup(): void {
    generateReportBtn.addEventListener("click", handleGenerateReport);
}

export function handleGenerateReport() {
    generateReport(reportInput.value).then();
}

setup()