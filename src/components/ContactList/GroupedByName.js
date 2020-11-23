
import ContactCard from '../ContactCard/ContactCard'

 const GroupedContactsByName = ({ handleSaveChanges}) => {
  return Object.keys(groupByLetter).map((letter) => {
      return (
          <div className="group" letter={`group-${letter}`}>
              {groupByLetter[letter].length > 0 ? (
                  <div>
                      {letter.toUpperCase()}
                      {groupByLetter[letter].map((contact) => {
                          return (
                              <ContactCard
                                  key={`${letter}-${contact.id}`}
                                  contact={contact}
                                  handleSaveChanges={handleSaveChanges}
                              />
                          )
                      })}
                      <hr />
                  </div>
              ) : null}
          </div>
      )
  })
}

// creating object  with keys (from letters array)  for grouping contacts by first letter
//
const alphabet = []
function genCharArray(charA, charZ) {
  let i = charA.charCodeAt(0)
  let j = charZ.charCodeAt(0)
  for (; i <= j; ++i) {
      alphabet.push([String.fromCharCode(i), []])
  }
  return alphabet
}
const entries = new Map(genCharArray('a', 'z'))

const groupByLetter = Object.fromEntries(entries)

// filling the array with contacts by their first letter of the name
//

const groupContacts = (contactsData) => {
  for (let i = 0; i < contactsData.length; i++) {
      const element = contactsData[i]

      const firstLetter = element.name
          .toString()
          .toLowerCase()
          .slice(0, 1)
      groupByLetter[firstLetter].push(element)
  }
}