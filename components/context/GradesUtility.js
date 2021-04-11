export const getEquivalentGrade = tempRawGrade => {
  switch (true) {
    case tempRawGrade >= 97.5:
      return `1.00`
    case tempRawGrade >= 94.5 && tempRawGrade < 97.5:
      return `1.25`
    case tempRawGrade >= 91.5 && tempRawGrade < 94.5:
      return `1.50`
    case tempRawGrade >= 88.5 && tempRawGrade < 91.5:
      return `1.75`
    case tempRawGrade >= 85.5 && tempRawGrade < 98.5:
      return `2.00`
    case tempRawGrade >= 82.5 && tempRawGrade < 85.5:
      return `2.25`
    case tempRawGrade >= 79.5 && tempRawGrade < 82.5:
      return `2.50`
    case tempRawGrade >= 76.5 && tempRawGrade < 79.5:
      return `2.75`
    case tempRawGrade >= 74.5 && tempRawGrade < 76.5:
      return `3.00`
    case tempRawGrade < 74.5:
      return `5.00`
  }
}
