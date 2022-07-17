---
title: 'Chart of Accounts Cleanup'
description: "Learn how I designed with machine learning to help accountants clean up their clients' messy books."
preview: 'chart-of-accounts-cleanup.jpg'
baseColor: '#9100ad'
grid: 6
---

In July 2019, the QuickBooks Live team wanted my help with a project. They were trying to make a tool for their accountants which would help them clean up clients' books.

DIY bookkeeping is a messy issue. QuickBooks tries to make accounting more friendly by simplifying complicated concepts so mere mortals can understand them. However, because of this translation, QuickBooks' small business customers may not categorize transactions accurately. This is a problem come tax time, when tax authorities expect things to arrive in a certain format.

Ideally, we'd solve this at the point of data entry. This was too hard to tackle on the team's aggressive schedule: *only two weeks!* But the team created a machine learning model which helps with cleanup. We would use and improve this model in the final product. The team could also recycle this work when they take on the data entry problem later.

I was solely responsible for the UI design (interaction and visual) for this project. Below is a screenshot of what the project looked like when I started:

![Screenshot showing a table of UI elements, some of which are crossed out for unclear reasons.](projects/chart-of-accounts-cleanup/starting-point.png "5536x4152")

As I discussed the project with the team, however, it became clear that this design didn't match our accountants' needs. The interface was confusing and the cleanup flow was unclear.

---

I started by taking a step back and redesigning the basic cleanup flow. After some lengthy discussions with our accountant partners, this was the flow we came up with together:

![A four-step flow: 1. Review detail types; 2. Fill in missing detail types; 3. Assign tax line items; 4. Standardize account names.](projects/chart-of-accounts-cleanup/cleanup-overview.png "3144x2172")

Let's get some terminology out of the way.

- A **chart of accounts** is a standard means for a company to categorize its cashflow in a way that it can report on later.
- **Accounts** are logical groups containing transactions.
- The **account name** is a summary of an **account type** and a **detail type**:
  - An **account type** is a broad category, like "Expenses" or "Cost of Goods Sold."
  - A **detail type** is like a subcategory which gives more info about what this account is actually for.
- A **tax line item** is a specific way to map an account for reporting to the IRS.

The account names depend on the company's industry and accounting method. They aren't standardized *per se*, but they should follow a conventional format. Accountants and tax authorities expect this.

![A table of accounts, showing detail types with update recommendations.](projects/chart-of-accounts-cleanup/review-detail-types.png "5760x4080")

The first step, shown above, is to review account types and detail types. We want to make sure these categories make sense to an accountant. The machine learning model first looks at the account name and transactions. It predicts the correct account type and detail type. Then, based on its confidence level, it recommends actions the accountant can take. The categorizations that result feed back into the model to improve it.

For accounts where the model is less certain, it requires explicit categorization from the accountant. This important design consideration prevents bad data from feeding back into the model.

Accountants can also see transactions in the account if they need more context:

![A modal dialog showing the transactions in the account, alongside recommendations for updating the detail type.](projects/chart-of-accounts-cleanup/review-detail-types-modal.png "4372x3196")

After that, the model suggests accounts and detail types for the accountant to add. Authorities generally expect to see these accounts in business records:

![A table of recommended accounts and detail types, based on the business's type and industry.](projects/chart-of-accounts-cleanup/fill-in-missing-detail-types.png "5760x4080")

The next step is to assign tax line items. Like I said earlier, there's no standard for account names, but the way businesses report them to the IRS *is* standardized. The model maps these in cases where they aren't present:

![Another table, this time showing tax line item mappings.](projects/chart-of-accounts-cleanup/assign-tax-line-items.png "5760x4080")

The last bit of housekeeping asks the accountant to rename any accounts which don't make sense after the cleanup process is done. The model recommends names based on the updates.

Finally, the accountant can download a CSV containing the changes. They can use this for keeping a record of what changed, and to apply the updates to the client's books:

![The final step, summarizing the changes being made to the Chart of Accounts.](projects/chart-of-accounts-cleanup/cleanup-summary.png "3144x2280")

---

This project required deep empathy for the accountants we serve. Understanding the problems they face when they first clean up their clients' books was key to designing this tool. I can help you with your team's hairy design challenges too; [drop me a line!](mailto "About that Chart of Accounts project...")
