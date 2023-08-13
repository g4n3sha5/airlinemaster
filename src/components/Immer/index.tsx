import {produce} from 'immer'

export const Immer = () => {
    interface Person {
        firstName: string,
        lastName: string
    }

    const Janek: Person = {
        firstName: 'Jan',
        lastName: 'Blacha'
    }
    const Adam: Person = {
        firstName: 'Adam',
        lastName: 'Czacha'
    }

    const mutant = produce(Adam, draft =>{
        draft.lastName = 'Niemutowany'
    })

    // console.log(Adam)
    // console.log(mutant)


    return(
        <>

            </>
    )
}





