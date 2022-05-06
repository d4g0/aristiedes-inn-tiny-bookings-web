export const gql = String.raw;

export async function wait(seconds = 0) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}