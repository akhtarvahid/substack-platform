import { UserType } from "@app/user/interface/user.type";

export type ProfileType = UserType & { following: boolean }