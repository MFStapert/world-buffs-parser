export interface FightsQuery {
    reportData: ReportData;
}

interface ReportData {
    report: Report;
}

interface Report {
    fights: Fight[];
}

interface Fight {
    id: number;
    encounterID: number;
}