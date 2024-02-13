export interface User {
	username: string
	password: string
}

export interface UserWithId extends User {
	id: string
}
