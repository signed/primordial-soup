interface Donor {
  id: string
}

export class Title {
  private readonly name: string
  private readonly copyCount: number = 1
  private readonly donor: Donor

  constructor(name: string, donor: Donor) {
    this.name = name
    this.donor = donor
  }
  getName() {
    return this.name
  }
  getCopyCount() {
    return this.copyCount
  }
  getDonorId() {
    return this.donor.id
  }
}

export class Library {
  private titles = new Map<String, Title>()

  public getTitles() {
    return this.titles
  }

  donate(title: Title) {
    this.titles.set(title.getName(), title)
  }

  public getTitlesDonatedByMember(donorMembershipId: string): Title[] {
    const memberTitles: Title[] = []
    for (const title of this.titles.values()) {
      if (title.getDonorId() === donorMembershipId) {
        memberTitles.push(title)
      }
    }
    return memberTitles
  }
}
