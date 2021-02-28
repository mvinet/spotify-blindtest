import {User} from "../classes/User"
import _ from "lodash";

const users: User[] = []

/**
 * Return all users in memory
 */
export const getUsers = () => {
    return users
}

/**
 * Remove an user from the memory
 * @param id the user's id for search and remove the user
 */
export const removeUser = (id: string) => {
    _.remove(users, {id: id})
}

/**
 * Save a user in the list
 * @param user User to save
 */
export const save = (user: User) => {
    if (user) {
        const existingUser = _.find(users, {id: user.id})

        if (existingUser) {
            removeUser(user.id)
        }

        users.push(user)
    }
}
