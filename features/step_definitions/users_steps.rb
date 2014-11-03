Given(/^the following users exist:$/) do |table|
  @users = table.raw
  @users.shift
  @users.each {|user| User.create(email: user[0], password: user[1])}
end

Given(/^"(.*?)" uploads a "(.*?)" bill for "(.*?)" pounds$/) do |user, description, amount|
  Bill.create(description: description, amount: amount, user_id: User.find_by_email(user).id)
end

Given(/^"(.*?)" uploads a "(.*?)" bill for "(.*?)" pounds and settles$/) do |user, description, amount|
  Bill.create(description: description, amount: amount, user_id: User.find_by_email(user).id, settled: true)
end

Then(/^I am logged in as "(.*?)"$/) do |user|
  current_user = User.find_by_email(user)
  login_as current_user, scope: :user
end

Then(/^I should see '(\d+)' buttons called "(.*?)"$/) do |number, name|
  expect(page).to have_css('button', text: name, count: number)
end

When(/^I select the menu$/) do
  page.find("#dropdown-menu").click
end