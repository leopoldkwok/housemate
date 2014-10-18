Given(/^the following users exist:$/) do |table|
  @users = table.raw
  puts '========='
  @user1 = User.create(email: @users[1][0], password: @users[1][1])
  @user2 = User.create(email: @users[2][0], password: @users[2][1])
end

Given(/^"(.*?)" uploads a "(.*?)" bill for "(.*?)" pounds$/) do |user, description, amount|
  Bill.create(description: description, amount: amount, user_id: User.find_by_email(user).id)
end

Then(/^I am logged in as "(.*?)"$/) do |user|
  current_user = User.find_by_email(user)
  login_as current_user, scope: :user
end
Then(/^I should see '(\d+)' buttons called "(.*?)"$/) do |number, name|
  expect(page).to have_css('button', text: name, count: number)
end