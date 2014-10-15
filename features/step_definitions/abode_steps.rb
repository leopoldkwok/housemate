Given(/^I am on the homepage$/) do
  visit '/'
end

When(/^I click the link to add an abode$/) do
  click_link 'Add an abode'
end

Then(/^I will should see the form to add an abode$/) do
  expect(current_path).to eq '/abodes/new'
  expect(page).to have_content "Add the address for your abode"
end