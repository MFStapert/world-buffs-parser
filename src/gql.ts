import { gql, GraphQLClient } from 'graphql-request'

export const fightsQuery = (reportId:string) => {
  return gql`
  {
    reportData {
      report(code: "${reportId}") {
        fights(killType: Kills) {
          id
          encounterID
          name
        }
      }
    }
  }
`
}

export const playerDetails = (reportId: string, fights: number[]) => {
  return gql`
  {
    reportData {
      report(code: "${reportId}") {
        playerDetails(fightIDs: [${fights}] )
      }
    }
  }
`
}

  export const auraQuery = (reportId: string, fights: number[]) => {
  return gql`
  {
    reportData {
      report(code: "${reportId}") {
        events(fightIDs: [${fights}], dataType: CombatantInfo) {
          data
        }
      }
    }
  }
`
}

export async function executeQuery<T>(token: string, query: string): Promise<T> {
  const endpoint = `https://www.warcraftlogs.com/api/v2/client`
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return  await graphQLClient.request<T>(query)
}
