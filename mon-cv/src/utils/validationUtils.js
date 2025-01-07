export const validationUtils = {
    rules: {
        required: (value) => (value ? '' : 'Ce champ est requis.'),

        minLength: (length) => (value) =>
            value && value.length >= length
                ? ''
                : `Ce champ doit contenir au minimum ${length} caractères.`,
        maxLength: (length) => (value) =>
            value && value.length <= length
                ? ''
                : `Ce champ doit contenir au maximum ${length} caractères.`,

        email: (value) =>
            /^(?!\.)("?(?!")[\w&'*+._%-]+(?:\.[\w&'*+._%-]+)*"?)@((?:[a-z0-9-]+\.)+[a-z]{2,})$/i.test(
                value,
            )
                ? ''
                : "L'email n'est pas valide.",

        phone: (value) =>
            /^(?:\+33|0)\s?[1-9](?:[\s.-]?\d{2}){4}$/.test(value)
                ? ''
                : "Le numéro de téléphone n'est pas valide.",

        date: (value) => {
            const today = new Date()
            const birthDate = new Date(value)

            if (isNaN(birthDate.getTime())) {
                return "La date n'est pas valide."
            }

            if (birthDate > today) {
                return 'La date ne peut pas être dans le futur.'
            }
        },
    },

    validateField(value, rules) {
        console.log(value)
        return rules.map((rule) => rule(value)).find((error) => error !== '')
    },
}
