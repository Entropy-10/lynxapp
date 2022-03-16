import useSWR from 'swr'
const fetcher = async (...args: [any, any]): Promise<void> => await fetch(...args).then(async res => await res.json())

export function useAllPlayers (): {players: any, playersLoading: boolean, playersError: any} {
  const { data, error } = useSWR('https://esttournaments.com/api/players', fetcher)

  return {
    players: data,
    playersLoading: error === null && data === null,
    playersError: error
  }
}

export function useSoloplayers (): {soloplayers: any, soloplayersLoading: boolean, soloplayersError: any} {
  const { data, error } = useSWR('https://esttournaments.com/api/freeplayers', fetcher)

  return {
    soloplayers: data,
    soloplayersLoading: error === null && data === null,
    soloplayersError: error
  }
}

export function useTeams (): {teams: any, teamsLoading: boolean, teamsLoadingError: any} {
  const { data, error } = useSWR('https://esttournaments.com/api/teams', fetcher)

  return {
    teams: data,
    teamsLoading: error === null && data === null,
    teamsLoadingError: error
  }
}

export function usePlayer (id: number): {player: any, playerLoading: boolean, playerError: any} {
  const { data, error } = useSWR(`https://esttournaments.com/api/${id}`, fetcher)

  return {
    player: data,
    playerLoading: error === null && data === null,
    playerError: error
  }
}
