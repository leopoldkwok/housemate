Given(/^I am on the homepage$/) do
  visit '/'
end

# Given(/^I have signed in as a user$/) do
#   User.create(email: 'bob@bob.com', password: '12345678')
#   user.sign_in('bob@bob.com', '12345678')
# end

When(/^I click the link to add an abode$/) do
  click_link 'Add an abode'
end

Then(/^I will should see the form to add an abode$/) do
  expect(current_path).to eq '/abodes/new'
  expect(page).to have_content "Add the address for your abode"
end

Given(/^I am on the new abode page$/) do
  visit '/abodes/new'
end

Given(/^I have filled in the form$/) do
fill_in 'Name number', :with => '29'
fill_in 'Street', :with => 'Acacia Road'
fill_in 'City', :with => 'London'
fill_in 'County', :with => 'Greater London'
fill_in 'Postcode', :with => 'N6 5UH'
end

When(/^I click submit$/) do
click_button 'Create Abode' 
end

Then(/^I should see the abode's page$/) do
  expect(current_path).to match(/abodes\/\d/)
end