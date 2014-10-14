

Given(/^that I am on the homepage$/) do
  visit '/'
end

Then(/^I should see a button called "(.*?)"$/) do |arg1|
  expect(page).to have_css '.add-bill'
  expect(page).to have_content '+ Add a Bill'
end

Then(/^when I select "(.*?)"$/) do |arg1|
  click_button arg1
end

Then(/^I should see an input called "(.*?)"$/) do |arg1|
  expect(page).to have_selector("input.input-#{arg1}")
end

