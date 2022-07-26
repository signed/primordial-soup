export class Library {
  private titles = new Map<String, Object[]>()

  public getTitles() {
    return this.titles
  }

  donate(titleName: string, donorMembershipId: string) {
    this.titles.set(titleName, [titleName, donorMembershipId, 1])
  }

  public getTitlesDonatedByMember(donorMembershipId: string): Object[][] {
    const allTitles = this.titles.values()
    const memberTitles: Object[][] = []
    for (const title of allTitles) {
      if (title[1] === donorMembershipId) {
        memberTitles.push(title)
      }
    }
    return memberTitles
  }
}
