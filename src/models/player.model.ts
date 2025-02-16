import {ReportModel} from "./report.model";

export interface PlayersQuery {
    reportData: ReportData;
}

interface ReportData {
    report: Report;
}

interface Report {
    playerDetails: PlayerDetailsData;
}

interface PlayerDetailsData {
    data: Data;
}

interface Data {
    playerDetails: PlayerDetails;
}

interface PlayerDetails {
    dps: Player[];
    healers: Player[];
    tanks: Player[];
}

interface Player {
    id: number;
    name: string;
}

export function collapsePlayers(playerDetails: PlayerDetails): Player[] {
    const players = [...playerDetails.dps, ...playerDetails.healers, ...playerDetails.tanks];
    return Array.from(new Map(players.map(player => [player.id, player])).values());
}

export function toReport(player: Player): ReportModel {
    return {
        playerName: player.name,
        playerId: player.id,
        dragonSlayer: 0,
        songFlower: 0,
        slipKik: 0,
        moldar: 0,
        fengus: 0
    }
}