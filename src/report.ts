import { getAccessToken } from "./auth";
import { auraQuery, executeQuery, fightsQuery, playerDetails } from "./gql";
import { FightsQuery } from "./models/fight.model";
import {collapsePlayers, PlayersQuery, toReport} from "./models/player.model";
import { AuraQuery, countAuraPresence } from "./models/aura.model";
import {ReportModel} from "./models/report.model";
import {worldBuffs} from "./models/world-buffs.model";
import {jsonToCsv} from "./csv";

export async function generateReport(reportId: string) {
    const token = await getAccessToken();

    const fightIds = await getFightIds(token, reportId);
    const playerQueryResponse = await executeQuery<PlayersQuery>(token, playerDetails(reportId, fightIds));

    console.log(playerQueryResponse);

    const auraDetailQueryResponse = await executeQuery<AuraQuery>(token, auraQuery(reportId, fightIds));
    const reports = buildReport(playerQueryResponse, auraDetailQueryResponse);

    jsonToCsv(`report-${Date.now()}.csv`, reports);
}

async function getFightIds(token: string, reportId: string): Promise<number[]> {
    const fightQueryResponse = await executeQuery<FightsQuery>(token, fightsQuery(reportId));
    return fightQueryResponse.reportData.report.fights.map(fight => fight.id);
}

function buildReport(playerQuery: PlayersQuery, auraQuery: AuraQuery): ReportModel[] {
    const playerData = collapsePlayers(playerQuery.reportData.report.playerDetails.data.playerDetails);
    const auraDetails = auraQuery.reportData.report.events.data;

    const reports = playerData.map(player => toReport(player));
    Object.entries(worldBuffs).forEach(([buffId, buffKey]) => {
        countAuraPresence(auraDetails, Number(buffId)).forEach(({ playerId, fightCount }) => {
            const report = reports.find(report => report.playerId === playerId);
            if (report) report[buffKey] = fightCount;
        });
    });

    return reports;
}
