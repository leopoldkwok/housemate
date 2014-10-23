Given(/^that I am on the homepage$/) do
  visit '/'
end

Then(/^I should see a button called "(.*?)" with css "(.*?)"$/) do |arg1, arg2|
    expect(page).to have_css arg2
    expect(page).to have_content arg1
end

Then(/^when I select "(.*?)"$/) do |arg1|
  click_button arg1
end

Then(/^I fill in "(.*?)" with "(.*?)" and "(.*?)" with "(.*?)"$/) do |arg1, arg2, arg3, arg4|
  fill_in arg1, with: arg2
  fill_in arg3, with: arg4
end

Then(/^I should see "(.*?)"$/) do |arg1|
  expect(page).to have_content arg1
end

Then(/^I should not see "(.*?)"$/) do |text|
  expect(page).not_to have_content text
end

Then(/^click the button "(.*?)"$/) do |arg1|
  click_button arg1
end

Then(/^I should see an "(.*?)" called "(.*?)"$/) do |element, text|
  expect(page).to have_css(element, visible: text)
end

Then(/^I should see a "(.*?)" called "(.*?)"$/) do |element, text|
  expect(page).to have_css(element, visible: text)
end

When(/^check the box$/) do
  check 'settle-check'
end

Then(/^that I refresh$/) do
  driver.navigate.refresh
end

Then(/^that I am on the sign up page$/) do
  visit '/users/sign_up'
end

