class CreateOutlines < ActiveRecord::Migration[5.1]
  def change
    create_table :outlines do |t|
      t.references :user, foreign_key: true
      t.string :name
      t.text :data

      t.timestamps
    end
  end
end
