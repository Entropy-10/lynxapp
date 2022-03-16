import NextAuth from 'next-auth'

export default NextAuth({
  providers: [
    {
      id: 'osu',
      name: 'Osu!',
      type: 'oauth',
      clientId: process.env.OSU_CLIENT_ID,
      clientSecret: process.env.OSU_CLIENT_SECRET,
      token: 'https://osu.ppy.sh/oauth/token',
      authorization: {
        url: 'https://osu.ppy.sh/oauth/authorize',
        params: {
          scope: 'identify'
        }
      },
      userinfo: 'https://osu.ppy.sh/api/v2/me/osu',
      profile (profile) {
        const authorizedUsers = process.env.AUTH_USERS
        let authorized = false

        if (authorizedUsers.includes(profile.id)) {
          authorized = true
        }

        return {
          id: profile.id,
          email: null,
          authorization: authorized,
          name: profile.username,
          image: profile.avatar_url,
          rank: profile.statistics.global_rank,
          discordTag: profile.discord
        }
      }
    }
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      (user != null) && (token.user = user)
      return token
    },
    session: async ({ session, token }) => {
      session.user = token.user
      return session
    }
  },
  secret: process.env.SECRET
})
