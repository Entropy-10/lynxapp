import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET
    }),

    {
      id: "osu",
      name: "Osu!",
      type: "oauth",
      clientId: process.env.OSU_CLIENT_ID,
      clientSecret: process.env.OSU_CLIENT_SECRET,
      token: "https://osu.ppy.sh/oauth/token",
      authorization: {
        url: "https://osu.ppy.sh/oauth/authorize",
        params: {
          scope: "identify",
        },
      },
      userinfo: "https://osu.ppy.sh/api/v2/me",
      profile(profile) {
        const authorizedUsers = process.env.AUTH_USERS;
        let authorized = 'unauthorized';

        if (authorizedUsers.includes(profile.id)) {
          authorized = 'authorized';
        }

        return {
          id: profile.id,
          email: authorized,
          name: profile.username,
          image: profile.avatar_url,
        }
      },
    }
  ],
  secret: process.env.SECRET,
})