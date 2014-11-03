Given(/^that I am on the homepage$/) do
  visit '/'
end

Then(/^I should see a button called "(.*?)" with css "(.*?)"$/) do |arg1, arg2|
    expect(page).to have_css arg2
    expect(page).to have_content arg1
end

Then(/^when I select "(.*?)"$/) do |button|
  click_button button
end

Then(/^I fill in "(.*?)" with "(.*?)" and "(.*?)" with "(.*?)"$/) do |bill, description, amount, value|
  fill_in bill, with: description
  fill_in amount, with: value
end

Then(/^I should see "(.*?)"$/) do |text|
  expect(page).to have_content text
end

Then(/^I should not see "(.*?)"$/) do |text|
  expect(page).not_to have_content text
end

Then(/^click the button "(.*?)"$/) do |button|
  click_button button 
end

Then(/^I click the button "(.*?)"$/) do |button|
  first(:button, button).click
end

Then(/^I should see an "(.*?)" called "(.*?)"$/) do |element, text|
  expect(page).to have_css(element, visible: text)
end

Then(/^I should see a "(.*?)" called "(.*?)"$/) do |element, text|
  expect(page).to have_css(element, visible: text)
end

When(/^check the box$/) do
  first(:checkbox, 'settle-check').set(true)
end

Then(/^that I refresh$/) do
  driver.navigate.refresh
end

Then(/^that I am on the sign up page$/) do
  visit '/users/sign_up'
end

