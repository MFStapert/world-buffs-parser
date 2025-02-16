export interface AuraQuery {
    reportData: ReportData;
}

interface ReportData {
    report: Report;
}

interface Report {
    events: Events;
}

interface Events {
    data: CombatantInfoData[];
}

interface CombatantInfoData {
    fight: number;
    sourceID: number;
    auras: Aura[];
}

interface Aura {
    ability: number
    name: string;
}

// Counts the presence of an aura in combatant info
export function countAuraPresence(data: CombatantInfoData[], targetAbility: number): { playerId: number; fightCount: number }[] {
    const playerFightMap = new Map<number, Set<number>>();

    for (const entry of data) {
        if (entry.auras.some(aura => aura.ability === targetAbility)) {
            if (!playerFightMap.has(entry.sourceID)) {
                playerFightMap.set(entry.sourceID, new Set());
            }
            playerFightMap.get(entry.sourceID)!.add(entry.fight);
        }
    }

    return Array.from(playerFightMap.entries()).map(([playerId, fights]) => ({
        playerId,
        fightCount: fights.size
    }));
}