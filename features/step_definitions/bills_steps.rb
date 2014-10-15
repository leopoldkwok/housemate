Given(/^that I am on the homepage$/) do
  visit '/'
end

Then(/^I should see a button called "(.*?)" with class "(.*?)"$/) do |arg1, arg2|
    expect(page).to have_css arg2
    expect(page).to have_content arg1
end

Then(/^when I select "(.*?)"$/) do |arg1|
  click_button arg1
end

Then(/^I should see an input called "(.*?)"$/) do |arg1|
  expect(page).to have_selector("input.input-#{arg1.downcase}")
end

Then(/^when I fill in "(.*?)" with "(.*?)" and "(.*?)" with "(.*?)"$/) do |arg1, arg2, arg3, arg4|
  fill_in arg1, with: arg2
  fill_in arg3, with: arg4
end

Then(/^I should see "(.*?)"$/) do |arg1|
  expect(page).to have_content arg1
end

Then(/^click the button "(.*?)"$/) do |arg1|
  click_button arg1
end
